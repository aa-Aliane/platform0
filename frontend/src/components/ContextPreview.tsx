import React from "react";
import { ContextType } from "../hooks/contextState";
import { usePreviews } from "../hooks/variablesState";
import { useContext } from "../hooks/contextState";

export type HandleDeleteType = (index: number, id: number) => void;

const ContextPreview = ({
  context,
  index,
  HandleDelete,
}: {
  context: ContextType;
  index: number;
  HandleDelete: HandleDeleteType;
}) => {
  const change_preview = usePreviews((state: any) => state.change_preview);
  const delete_context = useContext((state: any) => state.delete_context);

  return (
    <div className="line--container">
      <div className="context__content">{context.context}</div>
      <button
        className="btn btn__delete"
        onClick={() => delete_context(index)}
      >
        delete
      </button>
      <button className="btn btn__edit" onClick={() => change_preview(index)}>
        edit
      </button>
    </div>
  );
};

export default ContextPreview;
