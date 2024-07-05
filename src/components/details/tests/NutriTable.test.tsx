


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
import Details from '../Details';

// Mocks
import { mockSearchList } from '../../mocks/list';
import { mockApiData } from '../../mocks/apiData';

const mockDetails = () => {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <I18nextProvider i18n={i18next}>
                    <Details />
                </I18nextProvider>
            </BrowserRouter>
        </Provider>
    )
}

    /* Tests */

describe("NutriTable", () => {

    it('is dumb', async () => {

        await act(async () => {
            render(
                mockDetails()
            );
        });
        
        // without this render shit the next test with the mocked api requests fails
        // i am tired
        
    });

    it('should correctly change the calculated nutrients when changing the serving weight', async () => {

        global.fetch = (jest.fn() as jest.Mock)
            .mockImplementationOnce(mockSearchList())
            .mockImplementationOnce(mockApiData());

        await act(async () => {
            render(
                mockDetails()
            );
        });

        const searchInput =
            await screen.findByLabelText(/Search Input/i) as HTMLInputElement;

        await act(async () => {
            fireEvent.input(searchInput, { target: { value: "tomato" } });
        });

        const searchBtn = screen.getByLabelText(/Search Button/i) as HTMLInputElement;

        await act(async () => {
            fireEvent.click(searchBtn);
        });

        const servKcal = await screen.findByText("22 kcal");
        
        const servInput = screen.getByLabelText(/Serving Size - enter weight in grams/i);
        fireEvent.input(servInput, { target: { value: "80" } });

        expect(servKcal).toHaveTextContent('14 kcal');
        jest.clearAllMocks();

    });

});