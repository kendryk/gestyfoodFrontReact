import React from 'react';

export default function Pagination({currentPage,itemsPerPage, length, onPageChanged }){

    const pagesCount = Math.ceil(length / itemsPerPage);

    const pages = [];

    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
            <>

                <div>
                    <ul className="pagination">
                        <li className={"page-item" + (currentPage === 1 && " disabled")}>
                            <button className="page-link"
                                    onClick={()=> onPageChanged(currentPage -1)}
                                    >&laquo;
                            </button>
                        </li>

                        {pages.map(page =>
                        <li className={"page-item " + (currentPage === page && "active") }
                            key={page}
                            >
                            <button
                            className="page-link"
                            onClick={()=> onPageChanged(page)}
                            >
                            {page}
                            </button>
                        </li>
                        )}
                        <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                            <button className="page-link"
                            onClick={()=> onPageChanged(currentPage + 1)}
                            >&raquo;
                            </button>
                        </li>
                    </ul>
                </div>
            </>
    );




};

//Ajout de propriété de l'objet Pagination:

Pagination.getData = (items, currentPage, itemsPerPage) =>{
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage)

}