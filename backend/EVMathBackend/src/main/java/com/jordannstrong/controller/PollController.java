package com.jordannstrong.controller;

import com.jordannstrong.model.Poll;
import com.jordannstrong.repository.PollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PollController {

  @Autowired
  private PollRepository pollRepository;

  @CrossOrigin
  @GetMapping("/polls")
  public List<Poll> getPolls() {
    return pollRepository.findAll();
  }
}
