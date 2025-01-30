import Link from "next/link";

const HomepageContent = () => {
  return (
    <section className={"container"}>
      <ul>
        <li>
          <Link href='/local'>local game</Link>
        </li>
      </ul>
    </section>
  );
};
export default HomepageContent;
