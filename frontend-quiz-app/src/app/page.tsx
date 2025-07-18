import SelectionCards from "./_components/selectionCard";


export default function Home() {  

  return (
  <div className="content-layout">
    <div className="header-layout">
      <div className="title-text">
        <div className="text-preset-2-light text-blue-900 dark:text-grey-50">Welcome to the</div>
        <div className="text-preset-2-medium text-blue-900 dark:text-grey-50">Frontend Quiz!</div>
      </div>
      <div className="text-preset-5-itlaic text-grey-500 dark:text-blue-300">
        Pick a subject to get started!</div>
    </div>

    <SelectionCards />
  </div>
  );
}
