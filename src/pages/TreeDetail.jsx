import { useParams } from "react-router-dom";

export default function TreeDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Tree ID: {id}</h1>
    </div>
  );
}
