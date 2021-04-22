package com.jordannstrong.repository;

import com.jordannstrong.model.Poll;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("pollRepository")
public class PollRepositoryImpl implements PollRepository {

  private List<Poll> polls = new ArrayList<>();

  @Override
  public List<Poll> findAll() {
    return polls;
  }

  @Override
  public <S extends Poll> S save(S s) {
    polls.add(s);
    return null;
  }

  @Override
  public <S extends Poll> Iterable<S> saveAll(Iterable<S> iterable) {
    return null;
  }

  @Override
  public Optional<Poll> findById(Long aLong) {
    return Optional.empty();
  }

  @Override
  public boolean existsById(Long aLong) {
    return false;
  }

  @Override
  public Iterable<Poll> findAllById(Iterable<Long> iterable) {
    return null;
  }

  @Override
  public long count() {
    return 0;
  }

  @Override
  public void deleteById(Long aLong) {

  }

  @Override
  public void delete(Poll poll) {

  }

  @Override
  public void deleteAll(Iterable<? extends Poll> iterable) {

  }

  @Override
  public void deleteAll() {

  }
}
