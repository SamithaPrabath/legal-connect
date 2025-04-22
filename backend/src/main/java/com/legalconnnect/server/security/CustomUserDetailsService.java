package com.legalconnnect.server.security;

import com.legalconnnect.server.model.UserInfo;
import com.legalconnnect.server.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo user = userRepo.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        return new User(user.getContactInfo().getEmail(), user.getPassword(), new HashSet<>());
    }
}
