import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

let testGame;
const MAX_WRONG = 6;

beforeEach(function() {
  testGame = render(<Snowman maxWrong={MAX_WRONG} words={["apple"]} />);
})
// smoke test
it("renders without crashing", function () {
  render(<Snowman />);
});

// snapshot test
it("matches snapshot", function () {
  // const { asFragment } = render(<Snowman />); // don't need this because of beforeEach
  expect(testGame.asFragment()).toMatchSnapshot();
});

it("changes the image to img1 after the first incorrect guess", function () {
  const wrongLetter = testGame.queryByText("m");
  const img = testGame.queryByAltText("img0");

  fireEvent.click(wrongLetter);

  expect(img).toBeInTheDocument();
  expect(img).toContainHTML(`img1`);
  expect(img).not.toContainHTML(`img0`);
});

it("the image stays the same and letter is revealed if a correct guess is clicked ", function () {
  const correctLetter = testGame.queryByText("a");
  const img = testGame.queryByAltText("img0");

  fireEvent.click(correctLetter);

  expect(correctLetter).toBeDisabled();
  
  //checks image 
  expect(img).toContainHTML(`img0`);
  expect(img).not.toContainHTML(`img1`);
  
  //checks correct letter is revealed 
  const guessedWord = testGame.getByTestId("guessedWord");
  expect(guessedWord).toHaveTextContent("a");
  expect(guessedWord).toHaveTextContent("_");
  expect(guessedWord).not.toHaveTextContent("m");
});

it("should end the game after 6 guesses ", function () {
  const snowman = testGame.queryByTestId("snowman");

  // Click wrong letters 6 times
  const wrongLetters = [..."bzxqyw"];
  wrongLetters.forEach(l => fireEvent.click(testGame.queryByText(l)));

  expect(snowman).toHaveTextContent("You lose");
});

