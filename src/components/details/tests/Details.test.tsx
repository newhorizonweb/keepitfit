


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

describe("Details", () => {

    describe("Rendering", () => {

        it('checks if the search input is rendered', async () => {

            await act(async () => {
                render(
                    mockDetails()
                );
            });
            
            const elem = await screen.findByLabelText(/Search Input/i);
            expect(elem).toBeInTheDocument();
            
        });

        it('checks if the top details section is rendered', async () => {

            await act(async () => {
                render(
                    mockDetails()
                );
            });
            
            const elem = await screen.findByTestId(/details-top/i);
            expect(elem).toBeInTheDocument();
            
        });

        it('checks if the nutrition table (macro) is rendered', async () => {

            await act(async () => {
                render(
                    mockDetails()
                );
            });
            
            const elem = await screen.findByTestId(/macro-table/i);
            expect(elem).toBeInTheDocument();
            
        });

        it('checks if the nutrition table (micro) is rendered', async () => {

            await act(async () => {
                render(
                    mockDetails()
                );
            });
            
            const elem = await screen.findByTestId(/micro-table/i);
            expect(elem).toBeInTheDocument();
            
        });

        it('checks if the charts section is rendered', async () => {

            await act(async () => {
                render(
                    mockDetails()
                );
            });
            
            const elem = await screen.findByTestId(/charts-section/i);
            expect(elem).toBeInTheDocument();
            
        });
        
        it('checks if the navigation is rendered', async () => {

            await act(async () => {
                render(
                    mockDetails()
                );
            });
            
            const elem = await screen.findByTestId(/navigation-section/i);
            expect(elem).toBeInTheDocument();
            
        });

    });

    describe("REST API Data", () => {

        // Mock API requests (list & details data)
        global.fetch = jest.fn() as jest.Mock;

        beforeEach(() => {
            (fetch as jest.Mock).mockImplementationOnce(mockSearchList());
            (fetch as jest.Mock).mockImplementationOnce(mockApiData());
        });
        
        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should display details data from the REST API (valid search)', async () => {

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
            
            const detailsHeading = screen.getByTestId(/details-heading/i);
            expect(detailsHeading).toHaveTextContent('tomato');
            
        });
        
    });

});