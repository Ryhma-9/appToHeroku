package com.group9.leipajono.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomerPwEncoder extends BCryptPasswordEncoder {
}
