import { render } from "@testing-library/react";
import Home from "../pages/home/Home";
import '@testing-library/jest-dom';

describe("Home page", () => {
    it('Renders correctly and title is visible', async () => {
        const result = await render(<Home/>)
        const title = result.container.querySelector('.title')
        expect(title).toHaveTextContent("DonateCraft");
    })
});