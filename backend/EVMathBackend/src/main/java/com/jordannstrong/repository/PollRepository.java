package com.jordannstrong.repository;

import com.jordannstrong.model.Poll;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PollRepository extends CrudRepository<Poll, Long> {
  List<Poll> findAll();
}
