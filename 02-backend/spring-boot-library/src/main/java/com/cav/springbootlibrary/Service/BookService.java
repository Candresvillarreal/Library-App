package com.cav.springbootlibrary.Service;

import com.cav.springbootlibrary.entity.Book;
import java.util.ArrayList;
import java.util.List;

public class BookService {

    private List<Book> bookList = new ArrayList<>();

    public List<Book> getAllBooks() {
        return bookList;
    }

}
