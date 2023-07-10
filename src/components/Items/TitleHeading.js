const TitleHeading = ({ titleMessage, item, setOption }) => {
    return (
        <div className="title-heading__section flex justify-between p-3 gap-x-10 bg-orange-100 text-lime-800 font-serif capitalize tracking-wide italic font-bold text-lg rounded-lg">
                <h1 className="title-headding__title">
                    {titleMessage} <span className="ml-2 text-red-700 underline text-2xl">{item}</span>
                </h1>
                <button onClick={() => setOption(0)}>
                    <img src="/cancel.svg" width={30} height={30} alt="Cancel icon"/>
                </button>
        </div>   
    )
}

export default TitleHeading;