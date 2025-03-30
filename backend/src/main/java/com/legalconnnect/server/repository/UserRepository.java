package com.legalconnnect.server.repository;

import com.legalconnnect.server.model.UserInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserInfo, Integer> {
    @Query("SELECT u FROM UserInfo u WHERE  u.contactInfo.email = :email")
    Optional<UserInfo> findUserByEmail(String email);

    @Query("SELECT u FROM UserInfo u " +
            "WHERE u.type = 'LAWYER' AND " +
            "(u.basicInfo.firstName LIKE %:searchKey% OR " +
            "u.basicInfo.lastName LIKE %:searchKey%)")
    Page<UserInfo> findLawyersByPageWise(String searchKey, Pageable pageable);

    @Query("SELECT u FROM UserInfo u WHERE u.basicInfo.firstName LIKE %:name% OR u.basicInfo.lastName LIKE %:name%")
    List<UserInfo> searchByName(String name);

    @Query("SELECT u FROM UserInfo u WHERE u.type = 'LAWYER' AND u.basicInfo.language LIKE %:language% AND u.basicInfo.location LIKE %:location% AND u.basicInfo.occupation LIKE %:caseType%")
    List<UserInfo> searchLawyerList(String caseType, String language, String location);
}
