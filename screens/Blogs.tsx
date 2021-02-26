import * as React from "react";
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Text, View } from "../components/Themed";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import config from "../config";

export default function Blogs() {
	const [isLoading, setLoading] = React.useState(true);
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		fetch(`${config.base_url}/blogs`)
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	return (
		<View style={{ flex: 1, padding: 24 }}>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={data}
					keyExtractor={({ id }, index) => id}
					renderItem={({ item }) => (
						<>
							<Card>
								<Card.Title title={item.short_name} />
								<Card.Content>
									<Paragraph>{item.description}</Paragraph>
								</Card.Content>
								<Card.Actions>
									<Button>See</Button>
								</Card.Actions>
							</Card>
							<Text>{"\n"}</Text>
						</>
					)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
