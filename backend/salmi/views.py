from django.shortcuts import render
from .models import Word, Context
from .serializers import WordSerializer, ContextSerializer
from rest_framework import viewsets, status, permissions, authentication
from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.decorators import (
    action,
    api_view,
    permission_classes,
    authentication_classes,
)
import pandas as pd
import pdfkit as pdf
from tqdm import tqdm

import os

os.environ["DISPLAY"] = ":0.0"


class WordViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False)
    def get_words_range(self, request, pk=None):
        start = int(request.query_params.get("start", 0))
        end = int(request.query_params.get("end", 10))
        words = self.queryset[start:end]
        serializer = self.get_serializer(words, many=True)
        return Response(serializer.data)


class ContextViewSet(viewsets.ModelViewSet):
    queryset = Context.objects.all()
    serializer_class = ContextSerializer
    permission_classes = [permissions.AllowAny]


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def login(request):
    return Response(status=status.HTTP_200_OK, data="logged")


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def get_context(request):
    context = Context.objects.filter(word=request.data["word_id"])
    response = ContextSerializer(context, many=True)

    return Response(status=status.HTTP_200_OK, data=response.data)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def post_context(request):
    serializer = ContextSerializer
    word = Word.objects.get(id=request.data["word_id"])
    context = Context.objects.create(
        context=request.data["context"],
        keywords=request.data["keywords"],
        ref=request.data["ref"],
        word=word,
    )
    context.save()

    return Response(status=status.HTTP_200_OK, data="context created successfuly")


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def update_word(request):
    serializer = WordSerializer
    word = Word.objects.get(id=request.data["word_id"])
    word.word = request.data["word_ar"]
    word.word_en = request.data["word_en"]
    word.word_fr = request.data["word_fr"]

    contexts = Context.objects.filter(word=request.data["word_id"])
    for c in contexts:
        c.delete()

    for c in request.data["contexts"]:
        context = Context.objects.create(
            context=c["context"],
            keywords=c["keywords"],
            ref=c["ref"],
            word=word,
        )
        context.save()

    word.save()

    return Response(status=status.HTTP_200_OK, data="word updated successfuly")


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def post_word(request):
    serializer = WordSerializer
    word = Word.objects.create(
        word=request.data["word_ar"],
        word_en=request.data["word_en"],
        word_fr=request.data["word_fr"],
        created_at=0,
    )

    word.save()

    for c in request.data["contexts"]:
        context = Context.objects.create(
            context=c["context"],
            keywords=c["keywords"],
            ref=c["ref"],
            word=word,
        )
        context.save()

    return Response(status=status.HTTP_200_OK, data="word added successfuly")


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def download(request):
    words = Word.objects.all()

    words_dict = []

    for w in tqdm(words):
        contexts = Context.objects.filter(word=w.id)
        words_dict += [
            {
                "contexts": [c.context for c in contexts],
                "word_fr": w.word_fr,
                "word_en": w.word_en,
                "word": w.word,
            }
        ]

    # Modify the words_dict to display contexts as unordered list
    for i, w in enumerate(words_dict):
        context_list = "<ul>"
        for context in w["contexts"]:
            context_list += f"<li>{context}</li>"
        context_list += "</ul>"
        if context_list != "<ul></ul>":
            words_dict[i]["contexts"] = context_list
        else:
            words_dict[i]["contexts"] = ""

    words_df = pd.DataFrame(words_dict)
    words_df.columns = [
        "السياقات",
        "الكلمة بالفرنسية",
        "الكلمة بالإنجليجية",
        "الكلمة",
    ]

    css = """
    table {
    border-collapse: collapse;
    width: 100%;
    }

    @font-face {{
        font-family: 'Amiri';
        src: url('{% static 'AmiriQuran-Regular.ttf' %}') format('truetype');
    }}

    td, th {
    border: 1px solid #dddddd;
    text-align: right;
    padding: 8px;
    font-size: 1rem;
    font-family: 'Amiri', sans-serif;
    }

    ul, li {
    text-align: right;
    direction: rtl;
    }

    p {
    font-size: 1rem;
    }

    h1 {
    font-size: 1.8rem;
    font-family: 'Amiri', sans-serif;
    }

    th {
    background-color: #dddddd;
    }
    """

    html_string = f"""<html><head>
            <meta charset="utf-8">
        </head>
        {words_df.to_html(
            classes="my-table",
            index=False,
            header=True,
            escape=False,
            na_rep="",
            float_format=None,
            decimal=".",
            formatters=None,
            columns=None,
            col_space=None,
            table_id=None,
            notebook=False,
            border=None,
        )}
        <style>{css}</style>
    </html>"""

    html_string = f"""
        <h1 style="text-align: center;">قاموس المفردات</h1>
            <p style="text-align: center;">إجمالي عدد الكلمات:{len(words_df)}, عدد الكلمات التي تمت إضافة سياق لها:{len(words_dict)}</p>
        <hr>
        {html_string}
    """

    output = "./salammm.pdf"

    options = {
        "encoding": "utf-8",
        "page-size": "A4",
        "margin-top": "2cm",
        "margin-right": "2cm",
        "margin-bottom": "2cm",
        "margin-left": "2cm",
    }

    pdf.from_string(
        html_string,
        output,
        options=options,
    )

    pdf_file = open(output, "rb")
    response = FileResponse(pdf_file, as_attachment=True, filename="salmi.pdf")

    return response


# import pandas as pd
# from tqdm import tqdm

# mo3jam = pd.read_csv("mo3jam.tsv", sep="\t")
# mo3jam.columns = ["en", "fr", "ar"]
# mo3jam.dropna()


# for _, line in tqdm(mo3jam.iterrows()):

#     if str(line["ar"]) != "nan":
#         w = Word.objects.create(
#             word=line["ar"],
#             word_fr=line["fr"],
#             word_en=line["en"],
#             created_at=0,
#         )
#         w.save()
