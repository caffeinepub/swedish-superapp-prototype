import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Migration "migration";
import LocationRecommendationOrder "locationRecommendationOrder";

(with migration = Migration.run)
actor {
  type Category = {
    id : Text;
    name : Text;
    description : Text;
  };

  type LocationRecommendation = {
    city : Text;
    suggestions : [Text];
  };

  let categories = Map.empty<Text, Category>();
  let locationRecommendations = Map.empty<Text, LocationRecommendation>();

  public shared ({ caller }) func initialize() : async () {
    let initialCategories : [Category] = [
      {
        id = "food";
        name = "Mat & Restaurang";
        description = "Upptäck lokala matalternativ och restauranger";
      },
      {
        id = "transport";
        name = "Transportmedel";
        description = "Hitta transportalternativ med Uber, Bolt och liknande tjänster";
      },
      {
        id = "restaurants";
        name = "Restauranger";
        description = "Upptäck rekommenderade lokala restauranger";
      },
      {
        id = "entertainment";
        name = "Underhållning";
        description = "Utforska nöjesalternativ och aktiviteter";
      },
    ];

    for (category in initialCategories.values()) {
      categories.add(category.id, category);
    };

    let initialLocations : [LocationRecommendation] = [
      {
        city = "Stockholm";
        suggestions = [
          "Uber Stockholm",
          "Bolt Taxi",
          "Restaurang Riche",
          "TAKO Sushi",
        ];
      },
      {
        city = "Göteborg";
        suggestions = [
          "Uber Göteborg",
          "Bolt Ride",
          "Restaurang Bee",
          "Fiskekrogen",
        ];
      },
      {
        city = "Malmö";
        suggestions = [
          "Uber Malmö",
          "Bolt Rides",
          "Bastard Malmö",
          "Spoonery",
        ];
      },
    ];

    for (location in initialLocations.values()) {
      locationRecommendations.add(location.city, location);
    };
  };

  public query ({ caller }) func getAllCategories() : async [Category] {
    categories.values().toArray();
  };

  public query ({ caller }) func getCategory(id : Text) : async Category {
    switch (categories.get(id)) {
      case (null) { Runtime.trap("Kategorin finns inte") };
      case (?category) { category };
    };
  };

  public query ({ caller }) func getLocationRecommendations(city : Text) : async LocationRecommendation {
    switch (locationRecommendations.get(city)) {
      case (null) { Runtime.trap("Inga rekommendationer hittades för denna stad") };
      case (?recommendations) { recommendations };
    };
  };

  public query ({ caller }) func getAllLocationRecommendations() : async [LocationRecommendation] {
    locationRecommendations.values().toArray().sort();
  };
};
