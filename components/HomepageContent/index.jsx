import Link from "next/link";

const HomepageContent = () => {
  return (
    <section className={"container"}>
      <ul>
        <li>
          <Link href='/local'>local game</Link>
        </li>
        <li>
          <Link href='/rooms'>game rooms</Link>
        </li>
        <li>
          <Link href='/leaderbord'>leaderbord</Link>
        </li>
      </ul>
    </section>
  );
};
export default HomepageContent;
