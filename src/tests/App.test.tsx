import { render } from "@testing-library/react";
import App from "../App";

describe("Main page", function (){
   it('renders', function(){       
       global.fetch = jest.fn(() =>
           Promise.resolve({
               json: () => Promise.resolve({ test: 100 }),
           }),
       ) as jest.Mock;
       render(<App/>)
   }) 
});