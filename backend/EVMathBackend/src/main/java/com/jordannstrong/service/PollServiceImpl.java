package com.jordannstrong.service;

import com.jordannstrong.model.Poll;
import com.jordannstrong.repository.PollRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service("speakerService")
public class PollServiceImpl implements PollService {

  private PollRepository repository;

  private String baseURL = "https://www.realclearpolitics.com/epolls/2020/president/";
  private String[] urls = {baseURL + "tx/texas_trump_vs_biden-6818.html",
    baseURL + "in/indiana_trump_vs_biden-7189.html",
    baseURL + "nh/new_hampshire_trump_vs_biden-6779.html",
    baseURL + "ct/connecticut_trump_vs_biden-6999.html",
    baseURL + "ma/massachusetts_trump_vs_biden-6876.html",
    baseURL + "nj/new_jersey_trump_vs_biden-7193.html",
    baseURL + "va/virginia_trump_vs_biden-6988.html",
    baseURL + "wa/washington_trump_vs_biden-7060.html",
    baseURL + "ky/kentucky_trump_vs_biden-6915.html",
    baseURL + "mn/minnesota_trump_vs_biden-6966.html",
    baseURL + "ut/utah_trump_vs_biden-7195.html",
    baseURL + "md/maryland_trump_vs_biden-7209.html",
    baseURL + "ny/new_york_trump_vs_biden-7040.html",
    baseURL + "tn/tennessee_trump_vs_biden-7006.html",
    baseURL + "ca/california_trump_vs_biden-6755.html",
    baseURL + "oh/ohio_trump_vs_biden-6765.html",
    baseURL + "nc/north_carolina_trump_vs_biden-6744.html",
    baseURL + "az/arizona_trump_vs_biden-6807.html",
    baseURL + "wi/wisconsin_trump_vs_biden-6849.html",
    baseURL + "pa/pennsylvania_trump_vs_biden-6861.html",
    baseURL + "fl/florida_trump_vs_biden-6841.html",
    baseURL + "mi/michigan_trump_vs_biden-6761.html",
    baseURL + "mo/missouri_trump_vs_biden-7210.html",
    baseURL + "ar/arkansas_trump_vs_biden-7213.html",
    baseURL + "ga/georgia_trump_vs_biden-6974.html",
    baseURL + "nm/new_mexico_trump_vs_biden-6993.html",
    baseURL + "mt/montana_trump_vs_biden-7196.html",
    baseURL + "co/colorado_trump_vs_biden-6940.html",
    baseURL + "ks/kansas_trump_vs_biden-7058.html",
    baseURL + "ia/iowa_trump_vs_biden-6787.html",
    baseURL + "ms/mississippi_trump_vs_biden-7052.html",
    baseURL + "al/alabama_trump_vs_biden-7022.html",
    baseURL + "ga/georgia_trump_vs_biden-6974.html",
    baseURL + "sc/south_carolina_trump_vs_biden-6825.html",
    baseURL + "me/maine_trump_vs_biden-6922.html",
    baseURL + "ak/alaska_trump_vs_biden-7219.html",
    baseURL + "mecd1/maine_cd1_trump_vs_biden-7214.html",
    baseURL + "mecd2/maine_cd2_trump_vs_biden-7215.html",
    baseURL + "nv/nevada_trump_vs_biden-6867.html",
    baseURL + "la/louisiana_trump_vs_biden-7245.html",
    baseURL + "de/delaware_trump_vs_biden-7028.html",
    baseURL + "hi/hawaii_trump_vs_biden-7233.html",
    baseURL + "or/oregon_trump_vs_biden-7261.html",
    baseURL + "necd2/nebraska_cd2_trump_vs_biden-7279.html",
    baseURL + "ok/oklahoma_trump_vs_biden-7259.html",
    baseURL + "vt/vermont_trump_vs_biden-7276.html"};

  public PollServiceImpl() { }

  public PollServiceImpl(PollRepository pollRepository) {
    repository = pollRepository;
  }

  public void scrape() {
    for (int i = 0; i < urls.length; i++) {
      String url = urls[i];
      String state;

      // Store the state abbreviation
      if (url.substring(58, 60).equalsIgnoreCase("cd")){
        state = url.substring(56, 61);
      } else{
        state = url.substring(56, 58);
      }

      Document doc;

      Poll poll = new Poll();

      {
        try {
          doc = Jsoup.connect(url).get();
          Element spreadElem = doc.selectFirst("td.spread");
          String spread = spreadElem.text();
          System.out.println(spread);

          poll.setStateAbbreviation(state);
          poll.setWinnerSpread(spread);

          repository.save(poll);
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
  }

  @Override
  public List<Poll> findAll() { return repository.findAll(); }

  @Autowired
  public void setRepository(PollRepository repository) {
    this.repository = repository;
  }
}
