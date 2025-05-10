package com.legalconnnect.server.utils;

import com.legalconnnect.server.enums.ExtractableEnum;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class EnumUtils {
    public static <E extends Enum<E> & ExtractableEnum> List<String> extractEnum(Class<E> enumClass) {
        if (enumClass.isEnum()) return Arrays.stream(enumClass.getEnumConstants()).map(E::getDisplayName).toList();
        else throw new IllegalArgumentException("Provided class is not a enum class");
    }
}
