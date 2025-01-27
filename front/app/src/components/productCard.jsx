

export default function ProductCard(props) {
    return (
        <div className="shadow-md dark:shadow-blue-700/80 m-12 p-3 bg-gray-200 dark:bg-gray-900 rounded flex justify-center items-center flex-col h-80 w-72"> 
            <img src={`/filler.jpg`} alt={props.name} className="w-56 h-44 rounded" />
            <h1 className="text-center">{props.name}</h1>
            <p className="text-center">{props.description}</p>
        </div>
    );
}

// shadow-white also option instead of shadow-blue-700/80