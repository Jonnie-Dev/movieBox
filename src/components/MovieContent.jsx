import { useParams } from "react-router-dom";

export default function MovieContent() {
  const { id } = useParams();
  return (
    <section>
      <h1>{`Yeeeeeees ${id.slice(1)}`}</h1>
    </section>
  );
}
