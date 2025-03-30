package com.legalconnnect.server.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Data
public class PaginationResponse <T> {
    private List<T> data;
    private Long totalCount;

    public PaginationResponse (List<T> data, Long totalCount) {
        this.data = data;
        this.totalCount = totalCount;
    }
}
