import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

function Button(props) {
  const { text, dark, full, clickHandler } = props;
  return (
    <button
      onClick={clickHandler}
      className={`rounded-full overflow-hidden duration-200 border-2 border-solid hover:opacity-60 border-indigo-600 ${
        dark ? "text-white bg-indigo-600" : "text-indigo-600"
      } ${full ? "grid place-items-center w-full " : " "} `}
    >
      <p className={`px-6 sm:px-10 whitespace-nowrap py-2  ${fugaz.className}`}>
        {text}
      </p>
    </button>
  );
}
export default Button;
