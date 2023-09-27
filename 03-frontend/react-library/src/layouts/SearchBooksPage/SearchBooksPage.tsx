import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const baseUrl = "http://localhost:8080/api/books";
    
        const url = `${baseUrl}?page=0&size=5`;

        const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        };
    
        fetch(url, {
        method: 'get',
        headers: headers,
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const responseData = data._embedded.books;
    
            const loadedBooks = [];
    
            for (const key in responseData) {
            loadedBooks.push({
                id: responseData[key].id,
                title: responseData[key].title,
                author: responseData[key].author,
                description: responseData[key].description,
                copies: responseData[key].copies,
                copiesAvailable: responseData[key].copiesAvailable,
                category: responseData[key].category,
                img: responseData[key].img,
            });
            }
            setBooks(loadedBooks);
            setIsLoading(false);
        })
        .catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if(isLoading) {
        return(
            <SpinnerLoading/>
        )
    }
    
    if(httpError) {
        return(
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className="container">
                <div>
                    <div className="rw mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-labelledby="Search" />
                                <button className="btn btn-outline-success">
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" 
                                        type="button" 
                                        id="dropdownMenuButton1" 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false">
                                </button>
                                <ul className="dropdown-menu" aria-label="dropdownMenuButton1">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            All
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Front End
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Back End
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Data
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h5>Number of results: (22)</h5>
                    </div>
                    <p>
                        1 to 5 of 22 items:
                    </p>
                    {books.map(book => (
                        <SearchBook book={book} key={book.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
    
}