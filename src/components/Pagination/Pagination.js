//Pagination
const Pagination = ({ totalPage, setPage, currentPage }) => {
    //Previous page's button
    const PreviousButton = () => {
        return (
            <li onClick={handlePreviousPage} className="mx-1 block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </li>
        )
    };
    //Next page's button
    const NextButton = () => {
        return (
            <li onClick={handleNextPage} className="mx-1 block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            </li>
        )
    };
    //Display page's number (Inactive and active page number)
    const displayPageNumber = () => {
        let content = [];
        for (let i = 0; i < totalPage; i++) {
            if(i + 1 == currentPage) {
                content.push(
                    <li key={i} onClick={() => setPage(i + 1)}>
                        <span className="mx-2 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-red-800 dark:border-gray-700 dark:text-white dark:hover:bg-red-700 dark:hover:text-white hover:cursor-pointer">{i + 1}</span>
                    </li>
                );
            } else {
                content.push(
                    <li key={i} onClick={() => setPage(i + 1)}>
                        <span className="mx-2 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:cursor-pointer">{i + 1}</span>
                    </li>
                );
            }  
        }
        return content;
    };

    const handlePreviousPage = () => {
        currentPage == 1 ? setPage(totalPage) : setPage(currentPage - 1);
    };

    const handleNextPage = () => {
        currentPage == totalPage ? setPage(1) : setPage(currentPage + 1);
    };

    return (
        <div className="pagination py-8 flex justify-center">
            <nav aria-label="Pagination">
                <ul className="inline-flex items-center -space-x-px">
                    { totalPage > 1 && <PreviousButton/> }
                    { displayPageNumber() }
                    { totalPage > 1 && <NextButton/> }
                </ul>
                </nav>
        </div>
    )
};

export default Pagination;