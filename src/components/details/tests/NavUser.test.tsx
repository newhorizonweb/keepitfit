


// RTL & React
import { render, screen, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import { act } from 'react';

// Redux
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "../../redux/store";

// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from "../../app/i18n";

// Components
import NavUser from '../NavUser';

// Mocks
const mockNavUser = () => {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <I18nextProvider i18n={i18next}>
                    <NavUser />
                </I18nextProvider>
            </BrowserRouter>
        </Provider>
    )
}

    /* Tests */

describe("NavUser", () => {

    it('should not show the info popup on page load', async () => {

        await act(async () => {
            render(
                mockNavUser()
            );
        });

        const infoPopup = await screen.findByTestId("equation-info-popup");
        expect(infoPopup).not.toHaveClass('nav-info-open');

    });

    it('should open the info popup when clicking the button', async () => {

        await act(async () => {
            render(
                mockNavUser()
            );
        });

        const infoBtn = await screen.findByLabelText(/AMR equation/i);
        fireEvent.click(infoBtn);

        const infoPopup = screen.getByTestId("equation-info-popup");
        expect(infoPopup).toHaveClass('nav-info-open');

    });

    it('should not calculate anything when the fields are empty', async () => {

        await act(async () => {
            render(
                mockNavUser()
            );
        });

        const calcBtn = await screen.findByRole("button", {name: /Calculate/i});
        fireEvent.click(calcBtn);

        const userCalories = screen.queryByTestId("user-calories");
        expect(userCalories).not.toBeInTheDocument()

    });

    it('should calculate the results (calories, metric)', async () => {

        await act(async () => {
            render(
                mockNavUser()
            );
        });

        // Elements
        const sexElem = await screen.findByLabelText(/sex/i);
        fireEvent.input(sexElem, { target: { value: "male" } });

        const ageElem = await screen.findByLabelText(/age/i);
        fireEvent.input(ageElem, { target: { value: "20" } });

        const heightElem = await screen.findByLabelText(/height/i);
        fireEvent.input(heightElem, { target: { value: "180" } });

        const weightElem = await screen.findByLabelText(/weight/i);
        fireEvent.input(weightElem, { target: { value: "70" } });

        const activityElem = await screen.findByLabelText(/activity/i);
        fireEvent.input(activityElem, { target: { value: "1.375" } });

        const calcBtn = await screen.findByRole("button", {name: /Calculate/i});
        fireEvent.click(calcBtn);

        const kcalResult = screen.queryByTestId("kcal-result");
        expect(kcalResult).toHaveTextContent("2379 kcal");

    });

    it('should calculate the results (calories, imperial)', async () => {

        await act(async () => {
            render(
                mockNavUser()
            );
        });

        // Prevent a weird error
        window.HTMLElement.prototype.scrollTo = function() {};

        // Elements
        const unitsElem = await screen.findByLabelText(/units/i);
        fireEvent.input(unitsElem, { target: { value: "imperial" } });

        const sexElem = await screen.findByLabelText(/sex/i);
        fireEvent.input(sexElem, { target: { value: "female" } });

        const ageElem = await screen.findByLabelText(/age/i);
        fireEvent.input(ageElem, { target: { value: "42" } });

        const heightFtElem = await screen.findByTestId(/height-ft/i);
        fireEvent.input(heightFtElem, { target: { value: "6" } });

        const heightInElem = await screen.findByTestId(/height-in/i);
        fireEvent.input(heightInElem, { target: { value: "2" } });

        const weightLbsElem = await screen.findByTestId(/weight-lbs/i);
        fireEvent.input(weightLbsElem, { target: { value: "180" } });

        const activityElem = await screen.findByLabelText(/activity/i);
        fireEvent.input(activityElem, { target: { value: "1.725" } });

        const calcBtn = await screen.findByRole("button", {name: /Calculate/i});
        fireEvent.click(calcBtn);

        const kcalResult = screen.queryByTestId("kcal-result");
        expect(kcalResult).toHaveTextContent("2773 kcal");

    });

    it('should calculate the results (BMI, metric)', async () => {

        await act(async () => {
            render(
                mockNavUser()
            );
        });

        // Elements
        const unitsElem = await screen.findByLabelText(/units/i);
        fireEvent.input(unitsElem, { target: { value: "metric" } });

        const sexElem = await screen.findByLabelText(/sex/i);
        fireEvent.input(sexElem, { target: { value: "female" } });

        const ageElem = await screen.findByLabelText(/age/i);
        fireEvent.input(ageElem, { target: { value: "68" } });

        const heightElem = await screen.findByLabelText(/height/i);
        fireEvent.input(heightElem, { target: { value: "140" } });

        const weightElem = await screen.findByLabelText(/weight/i);
        fireEvent.input(weightElem, { target: { value: "55" } });

        const activityElem = await screen.findByLabelText(/activity/i);
        fireEvent.input(activityElem, { target: { value: "1.2" } });

        const calcBtn = await screen.findByRole("button", {name: /Calculate/i});
        fireEvent.click(calcBtn);

        const kcalResult = screen.queryByTestId("user-bmi");
        expect(kcalResult).toHaveTextContent("28.1");

    });

    it('should calculate the results (BMI, imperial)', async () => {

        await act(async () => {
            render(
                mockNavUser()
            );
        });

        // Prevent a weird error
        window.HTMLElement.prototype.scrollTo = function() {};

        // Elements
        const unitsElem = await screen.findByLabelText(/units/i);
        fireEvent.input(unitsElem, { target: { value: "imperial" } });

        const sexElem = await screen.findByLabelText(/sex/i);
        fireEvent.input(sexElem, { target: { value: "male" } });

        const ageElem = await screen.findByLabelText(/age/i);
        fireEvent.input(ageElem, { target: { value: "16" } });

        const heightFtElem = await screen.findByTestId(/height-ft/i);
        fireEvent.input(heightFtElem, { target: { value: "5" } });

        const heightInElem = await screen.findByTestId(/height-in/i);
        fireEvent.input(heightInElem, { target: { value: "8" } });

        const weightLbsElem = await screen.findByTestId(/weight-lbs/i);
        fireEvent.input(weightLbsElem, { target: { value: "222" } });

        const activityElem = await screen.findByLabelText(/activity/i);
        fireEvent.input(activityElem, { target: { value: "1" } });

        const calcBtn = await screen.findByRole("button", {name: /Calculate/i});
        fireEvent.click(calcBtn);

        const kcalResult = screen.queryByTestId("user-bmi");
        expect(kcalResult).toHaveTextContent("33.8");

    });

});