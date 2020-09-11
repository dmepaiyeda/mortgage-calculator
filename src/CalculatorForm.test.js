import React from 'react';
import Enzyme, {shallow, } from 'enzyme'
import CalculatorForm from './CalculatorForm';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe("Calculator Form component", () => {
    test("renders", () => {
        const wrapper = shallow(<CalculatorForm />);

        expect(wrapper.exists()).toBe(true);
    });

    test("when the form is submitted the event is cancelled", () => {
        const wrapper = shallow(<CalculatorForm />);
        let isPrevented = false;
        wrapper.find("Form").simulate("submit", {
            preventDefault: () => {
                isPrevented = true;
            }
        });

        expect(isPrevented).toBe(true);
    });
});

