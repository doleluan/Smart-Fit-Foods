package com.example.backend.services;

import com.example.backend.dto.AccountDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.Random;

@Service
public class MailServices {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private IAccountServices iAccountServices;
    public void sendMail(AccountDTO accountDTO) throws MessagingException {
        Random random= new Random();
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            otp.append(random.nextInt(10));
        }
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true);
        mimeMessageHelper.setFrom("leluando2001@gmail.com");
        mimeMessageHelper.setTo("luanyasuovc@gmail.com");
        mimeMessageHelper.setText("Đây là mã xác nhận thay đổi mật khẩu mới: " + otp.toString());
        mimeMessageHelper.setSubject("Xác nhận mật khẩu mới");
        this.iAccountServices.saveVerifyCode(otp.toString(), accountDTO.getUsername());
        javaMailSender.send(mimeMessage);
    }
}
