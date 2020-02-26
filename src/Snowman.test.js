import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

// smoke test
it("renders without crashing", function() {
  render(<Snowman />);
});

// snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Snowman />);
  expect(asFragment()).toMatchSnapshot();
});

it("changes the image to img1 after the first incorrect guess", function(){
  const { queryByAltText, queryByText } = render(<Snowman />);
  const wrongLetter = queryByText("m");
  const img = queryByAltText("img0");
  fireEvent.click(wrongLetter);
  expect(img).toBeInTheDocument();
  expect(img).toContainHTML(`img1`);
  expect(img).not.toContainHTML(`img0`);
});

it("the image stays the same and letter is revealed if a correct guess is clicked ", function(){
  const { queryByAltText, queryByText , getByTestId} = render(<Snowman />);
  const correctLetter = queryByText("a");
  const img = queryByAltText("img0");
  fireEvent.click(correctLetter);

  expect(correctLetter).toBeDisabled();
  //checks image 
  expect(img).toContainHTML(`img0`);
  expect(img).not.toContainHTML(`img1`);
  //checks correct letter is revealed 
  const guessedWord = getByTestId("guessedWord");
  expect(guessedWord).toHaveTextContent("a");
  expect(guessedWord).toHaveTextContent("_");
  expect(guessedWord).not.toHaveTextContent("m");
});