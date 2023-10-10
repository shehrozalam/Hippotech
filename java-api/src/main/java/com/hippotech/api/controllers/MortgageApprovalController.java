package com.hippotech.api.controllers;

import com.hippotech.api.data.ApprovalRepository;
import com.hippotech.api.data.BlogRepository;
import com.hippotech.api.data.UserRepository;
import com.hippotech.api.dto.ApprovalRequestDto;
import com.hippotech.api.model.ApprovalRequest;
import com.hippotech.api.model.BlogPost;
import com.hippotech.api.model.BlogPostComment;
import com.hippotech.api.model.MortgageApprovalEvent;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

import java.sql.*;

@Api(tags = "Mortgage Approval")
@RestController
public class MortgageApprovalController {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private EntityManager entityManager;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApprovalRepository approvalRepository;

    @GetMapping("api/approval")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Mortage appovals are returned"),
    })
    public ResponseEntity<List<ApprovalRequest>> getAll() {
        List<ApprovalRequest> approvals = approvalRepository.findAll();
        return new ResponseEntity<>(approvals, HttpStatus.OK);
    }

    @DeleteMapping("api/approval/{id}")
    public ResponseEntity<?> withdrawApprovalRequest(@PathVariable Long id) {
      approvalRepository.deleteById(id);
      return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("api/approval")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Approval request is submitted for processing."),
    })
    public ResponseEntity<?> postComment(@RequestBody ApprovalRequestDto approvalRequestDto) {
  //      String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        MortgageApprovalEvent mortgageApprovalEvent = new MortgageApprovalEvent();
        DateTimeFormatter dtf1 = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter dtf2 = DateTimeFormatter.ofPattern("HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        mortgageApprovalEvent.setDate(dtf1.format(now) + "T" + dtf2.format(now) + ".000Z");
        mortgageApprovalEvent.setEvent("Created");
        mortgageApprovalEvent.setParty("Customer");
        mortgageApprovalEvent.setDetails("Submitted for approval.");
        List<MortgageApprovalEvent> history = new ArrayList<MortgageApprovalEvent>();
        history.add(mortgageApprovalEvent);

        ApprovalRequest approvalRequest = new ApprovalRequest();
        approvalRequest.setAddress1(approvalRequestDto.getAddress1());
        approvalRequest.setStatus("Submitted for Approval");
        approvalRequest.setPurchasePrice(approvalRequestDto.getPurchasePrice());
        approvalRequest.setAmountToBorrow(approvalRequestDto.getAmountToBorrow());
        approvalRequest.setHistory(history);
        approvalRepository.save(approvalRequest);

        ProcessBuilder builder = new ProcessBuilder();
        builder.command("sh", "-c", "'cat " + approvalRequest.getAddress1() + " > addressLog.txt'" );
        String mypassword = "password123"
        try {
          // List<ApprovalRequest> results = entityManager.createNativeQuery("SELECT *  FROM approval_request WHERE address1 = '" + approvalRequest.getAddress1() + "'").getResultList();
            Process process = builder.start();
            int exitCode = process.waitFor();
        } catch (Exception e) {
         
        }

        return new ResponseEntity<>(approvalRequest, HttpStatus.CREATED);
    }
}
