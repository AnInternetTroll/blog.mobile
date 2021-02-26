import * as React from "react";
import { StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Text, View } from "../components/Themed";
import { Button, Card, Paragraph } from "react-native-paper";

import config from "../config";

export default function User({
	navigation,
	route,
}: {
	navigation: any;
	route: { params: { user: any } };
}) {
	const [isLoading, setLoading] = React.useState(true);
	const [data, setData]: [
		any[],
		React.Dispatch<React.SetStateAction<never[]>>
	] = React.useState([]);
	const user = route.params.user;

	React.useEffect(() => {
		fetch(`${config.base_url}/blogs/${user.username}`)
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	return (
		<View style={{ flex: 1, padding: 24 }}>
			<>
				<Card>
					<Card.Title title={user.username} />
					<Card.Content>
						<Paragraph>{user.bio}</Paragraph>
					</Card.Content>
				</Card>
				<Text>{"\n"}</Text>
			</>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={data}
					keyExtractor={({ id }, index) => id}
					renderItem={({ item }) => (
						<>
							<Card>
								<Card.Title title={item.name} />
								<Card.Content>
									<Paragraph>{item.description}</Paragraph>
								</Card.Content>
								<Card.Actions>
									<Button
										onPress={() =>
											navigation.navigate("Blog", {
												user: item,
											})
										}
									>
										See
									</Button>
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
