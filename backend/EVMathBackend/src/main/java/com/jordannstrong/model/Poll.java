package com.jordannstrong.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;

public class Poll {
  private String stateAbbreviation;
  private String winnerSpread;

  @Autowired
  @JsonProperty("0")
  public String getStateAbbreviation() {
    return stateAbbreviation;
  }

  @Autowired
  public void setStateAbbreviation(String stateAbbreviation) {
    this.stateAbbreviation = stateAbbreviation;
  }

  @Autowired
  @JsonProperty("1")
  public String getWinnerSpread() {
    return winnerSpread;
  }

  @Autowired
  public void setWinnerSpread(String winnerSpread) {
    this.winnerSpread = winnerSpread;
  }
}
