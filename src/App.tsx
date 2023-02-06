import { GlobalStyle } from "./global-style";
import {
	ThemeProvider,
	ListProvider,
	EditProvider,
	ItemProvider,
} from "context";
import Main from "./components/main/Main";

const App = () => {
	return (
		<div className="App">
			<ThemeProvider>
				<ListProvider>
					<EditProvider>
						<ItemProvider>
							<GlobalStyle />
							<Main />
						</ItemProvider>
					</EditProvider>
				</ListProvider>
			</ThemeProvider>
		</div>
	);
};

export default App;
