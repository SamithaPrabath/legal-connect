package com.legalconnnect.server.common.service;

public interface MapperService <RequestDto, ResponseDto, Model>{
    ResponseDto toDto(Model model);
    Model toModel(RequestDto requestDto);
}
