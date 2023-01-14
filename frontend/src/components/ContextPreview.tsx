import React from "react";
import { ContextType } from "../hooks/contextState";
import { useNewContext, usePreviews } from "../hooks/variablesState";
import { useContext } from "../hooks/contextState";

export type HandleDeleteType = (index: number, id: number) => void;

const ContextPreview = ({
  index,
  HandleDelete,
}: {
  context: ContextType;
  index: number;
  HandleDelete: HandleDeleteType;
}) => {
  const change_preview = usePreviews((state: any) => state.change_preview);
  const context = useContext((state: any) => state.contexts[index]);

  const delete_context = useContext((state: any) => state.delete_context);

  const close_new = useNewContext((state: any) => state.change_context);

  return (
    <div className="line--container">
      <div className="context__content">{context.context}</div>
      <button className="btn btn__delete" onClick={() => delete_context(index)}>
        حذف
      </button>
      <button
        className="btn btn__edit"
        onClick={() => {
          change_preview(index);
          close_new(false);
        }}
      >
        مراجعة
      </button>
    </div>
  );
};

export default ContextPreview;
