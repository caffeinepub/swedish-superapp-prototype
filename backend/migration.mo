import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  type Category = {
    id : Text;
    name : Text;
    description : Text;
  };

  type LocationRecommendation = {
    city : Text;
    suggestions : [Text];
  };

  type OldActor = {
    categories : Map.Map<Text, Category>;
    locationRecommendations : Map.Map<Text, LocationRecommendation>;
  };

  type NewActor = {
    categories : Map.Map<Text, Category>;
    locationRecommendations : Map.Map<Text, LocationRecommendation>;
  };

  public func run(old : OldActor) : NewActor {
    old;
  };
};
