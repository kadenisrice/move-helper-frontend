import UHaul from "../models/UHaulTruck";
import eightImg from "../assets/8-uhaul-pickup-truck.png";
import nineImg from "../assets/9-uhaul-cargo-van.png";
import tenImg from "../assets/10Medium.png";
import fifteenImg from "../assets/15Medium.png";
import seventeenImg from "../assets/17Medium.png";
import twentyImg from "../assets/20Medium.png";
import twentySixImg from "../assets/26Medium.png";

const uhualFleet: UHaul[] = [
  {
    type: "8' Pickup Truck",
    movingType: "Home improvement / Small loads",
    dimensions: {
      inside: "7'10\" x 5'2\" x 1'9\" (LxWxH)",
    },
    rate: {
      baseRate: 19.95,
      perMile: 0.79,
    },
    image: eightImg,
  },
  {
    type: "9' Cargo Van",
    movingType: "Apartment - 1 bedroom / Studio / Deliveries",
    dimensions: {
      inside: "9'6\" x 5'7\" x 4'8\" (LxWxH)",
      doorOpening: "5'1-1/2\" x 4'1-1/2\" (WxH)",
    },
    rate: {
      baseRate: 19.95,
      perMile: 0.79,
    },
    image: nineImg,
  },
  {
    type: "10' Truck",
    movingType: "Studio to 1 Bedroom Apt.",
    dimensions: {
      inside: "9'11\" x 6'4\" x 6'2\" (LxWxH)",
      doorOpening: "5'11\" x 5'7\" (WxH)",
      deckHeight: "2'5\"",
      length: "9'11\"",
    },
    rate: {
      baseRate: 19.95,
      perMile: 0.99,
    },
    image: tenImg,
  },
  {
    type: "15' Truck",
    movingType: "1 Bedroom Home to 2 Bedroom Apt.",
    dimensions: {
      inside: "15' x 7'8\" x 7'2\" (LxWxH)",
      doorOpening: "7'3\" x 6'5\" (WxH)",
      deckHeight: "2'9\"",
      length: "12'5\"",
      loadingRamp: "EZ-Load Ramp",
    },
    rate: {
      baseRate: 29.95,
      perMile: 0.99,
    },
    image: fifteenImg,
  },
  {
    type: "17' Truck",
    movingType: "Home up to 2 bedrooms",
    dimensions: {
      inside: "16'9\" x 7'8\" x 7'2\" (LxWxH)",
      doorOpening: "7'3\" x 6'5\" (WxH)",
      deckHeight: "2'10\"",
      length: "14'3\"",
      loadingRamp: "EZ-Load Ramp",
    },
    rate: {
      baseRate: 39.95,
      perMile: 0.99,
    },
    image: seventeenImg,
  },
  {
    type: "20' Truck",
    movingType: "2 Bedroom Home to 3 Bedroom Apt.",
    dimensions: {
      inside: "19'6\" x 7'8\" x 7'2\" (LxWxH)",
      doorOpening: "7'3\" x 6'5\" (WxH)",
      deckHeight: "2'11\"",
      length: "16'10\"",
      loadingRamp: "EZ-Load Ramp",
    },
    rate: {
      baseRate: 39.95,
      perMile: 0.99,
    },
    image: twentyImg,
  },
  {
    type: "26' Truck",
    movingType: "3 Bedroom Home to 4 Bedroom Home",
    dimensions: {
      inside: "26'2\" x 8'2\" x 8'3\" (LxWxH)",
      doorOpening: "7'9\" x 6'10\" (WxH)",
      deckHeight: "2' 11\"",
      length: "23'5\"",
      loadingRamp: "EZ-Load Ramp",
    },
    rate: {
      baseRate: 39.95,
      perMile: 0.99,
    },
    image: twentySixImg,
  },
];

export default uhualFleet;
