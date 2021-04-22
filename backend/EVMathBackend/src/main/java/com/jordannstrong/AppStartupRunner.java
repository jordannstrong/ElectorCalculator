package com.jordannstrong;

import com.jordannstrong.service.PollServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class AppStartupRunner implements ApplicationRunner {
  @Autowired
  private PollServiceImpl service;

  @Override
  public void run(ApplicationArguments args) throws Exception {
    service.scrape();
  }
}
