package com.legalconnnect.server;

import com.legalconnnect.server.config.user.BasicInfo;
import com.legalconnnect.server.config.user.ContactInfo;
import com.legalconnnect.server.enums.UserType;
import com.legalconnnect.server.model.UserInfo;
import com.legalconnnect.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@RequiredArgsConstructor
public class BackendApplication implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findUserByEmail("admin").isPresent()) return;

        UserInfo userInfo = new UserInfo();
        String encode = passwordEncoder.encode("admin@12345");
        BasicInfo basicInfo = new BasicInfo();
        basicInfo.setFirstName("Admin");
        basicInfo.setLastName("User");
        ContactInfo contactInfo = new ContactInfo();
        contactInfo.setEmail("admin");
        userInfo.setPassword(encode);
        userInfo.setBasicInfo(basicInfo);
        userInfo.setContactInfo(contactInfo);
        userInfo.setType(UserType.ADMIN);

        userRepository.saveAndFlush(userInfo);
    }
}
