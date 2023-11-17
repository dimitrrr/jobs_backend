module.exports = (CVData) => {
	const { first_name, last_name, city, country, phone, email, postal_code, role } = CVData;

	return `
    <!doctype html>
    <html>
			<head>
				<meta charset="utf-8">
				<title>PDF Result Template</title>
				<style>
				.color-red {
					color: #ff0000;
					font-weight: bold;
				}
				.bold {
					font-weight: bold;
				}
				</style>
			</head>
			<body>
				<div class='color-red'>
					${first_name} ${last_name}
				</div>
				<div class='bold'>${role}</div>
				<div>${city}, ${country}</div>
				<div>${phone}</div>
				<div>${email}</div>
				<div>Індекс: ${postal_code}</div>
			</body>
		</html>
	`;
}