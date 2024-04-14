module.exports = (CVData) => {
	const { first_name = '', last_name = '', city = '', country = '', phone = '', email = '', 
	postal_code = '', role = '', degree = '', field_of_study = '', school_name = '', 
	school_location = '', graduation_date = '', school_mark = '', job_title = '', 
	employer = '', job_start_date = '', job_end_date = '', job_description = '', still_working = '', skills = [], self_characteristics = '', 
	languages = [], sertificates = '', portfolio = '', additionalFields = [] } = CVData;

	const skillsText = skills.map(ps => `<li>${ps.name} - ${ps.value}</li>`).join('');
	const languagesText = languages.map(l => `<li>${l.name}-${l.value}</li>`).join('');
	const additionalFieldsText = additionalFields.map(af => `<div class="talent"><h2>${af.name}</h2><p>${af.value}</p></div>`).join('');
	const jobStartDateText = job_start_date ? new Date(job_start_date).toLocaleDateString() : '';
	const jobEndDateText = still_working ? 'Still working' : job_end_date ? new Date(job_end_date).toLocaleDateString() : '';
	const graduationDate = new Date(graduation_date || null);
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const graduationDateText = graduation_date ? `${months[graduationDate.getMonth()]}, ${graduationDate.getFullYear()}` : '';

	return `
	<!DOCTYPE html>
		<html lang="uk">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Резюме - ${first_name} ${last_name}</title>
			<style>
					body {
							font-family: Arial, sans-serif;
							margin: 0;
							padding: 0;
							background-color: #f4f4f4;
					}

					.container {
							width: 80%;
							margin: 20px auto;
							background-color: #fff;
							padding: 20px;
							border-radius: 8px;
							box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
					}

					.header {
							text-align: center;
							margin-bottom: 20px;
					}

					.contact-info, .job-history, .skills, .languages, .additional-info {
							margin-bottom: 20px;
					}

					.contact-info h2, .job-history h2, .skills h2, .languages h2, .additional-info h2 {
							border-bottom: 2px solid #333;
							padding-bottom: 5px;
							margin-bottom: 10px;
					}

					.job-item {
							margin-bottom: 15px;
					}

					.job-item p {
							margin: 5px 0;
					}

					.skill-item {
							margin-bottom: 10px;
					}

					.skill-item span {
							display: inline-block;
							width: 150px;
							font-weight: bold;
					}

					.language-item {
							margin-bottom: 10px;
					}

					.language-item span {
							display: inline-block;
							width: 150px;
							font-weight: bold;
					}

					.additional-info-item {
							margin-bottom: 10px;
					}

					.additional-info-item span {
							display: inline-block;
							width: 150px;
							font-weight: bold;
					}

					.self-characteristics {
							margin-bottom: 20px;
					}
			</style>
		</head>
		<body>
			<div class="container">
				${first_name && last_name ? `
					<div class="header">
						${first_name && last_name ? `<h1>${first_name} ${last_name}</h1>` : ''}
						${role ? `<p>${role}</p>` : ''}
						${city && country ? `<p>${city}, ${country}</p>` : ''}
						${phone ? `<p>${phone}</p>` : ''}
						${email ? `<p>${email}</p>` : ''}
						${postal_code ? `<p><strong>Postal index:</strong> ${postal_code}</p>` : ''}
					</div>
				` : ''}
				
				${job_title ? `
					<div class="job-history">
						<h2>Job experience</h2>
						<div class="job-item">
							${job_title ? `<p><strong>Job title:</strong> ${job_title}</p>` : ''}
							${employer ? `<p><strong>Employer:</strong> ${employer}</p>` : ''}
							${jobStartDateText ? `<p><strong>Start date:</strong> ${jobStartDateText}</p>` : ''}
							${jobEndDateText ? `<p><strong>End date:</strong> ${jobEndDateText}</p>` : ''}
							${job_description ? `<p><strong>Description:</strong> ${job_description}</p>` : ''}
						</div>
					</div>
				` : ''}
				
				${degree && field_of_study && graduationDate ? `
					<div class="education">
						<h2>Education</h2>
						${degree ? `<p><strong>Degree:</strong> ${degree}</p>` : ''}
						${field_of_study ? `<p><strong>Field of study:</strong> ${field_of_study}</p>` : ''}
						${school_name ? `<p><strong>University name:</strong> ${school_name}</p>` : ''}
						${school_location ? `<p><strong>Location:</strong> ${school_location}</p>` : ''}
						${graduationDateText ? `<p><strong>Graduation date:</strong> ${graduationDateText}</p>` : ''}
						${school_mark ? `<p><strong>Average mark:</strong> ${school_mark}</p>` : ''}
					</div>
				` : ''}
				
				${skills && skills.length ? `
					<div class="skills">
						<h2>Skills</h2>
						${skills.map(skill => `
							<div class="skill-item">
								<span>${skill.name}:</span> ${skill.value}
							</div>
						`).join('')}
					</div>
				` : ''}
				
				${languages && languages.length ? `
					<div class="languages">
						<h2>Languages</h2>
						${languages.map(language => `
							<div class="language-item">
								<span>${language.name}:</span> ${language.value}
							</div>
						`).join('')}
					</div>
				` : ''}
				
				${additionalFields && additionalFields.length ? `
					<div class="additional-info">
						<h2>Additional information</h2>
						${additionalFields.map(field => `
							<div class="additional-info-item">
								<span>${field.name}:</span> ${field.value}
							</div>
						`).join('')}
					</div>
				` : ''}
				
				${self_characteristics ? `
					<div class="self-characteristics">
						<h2>Self characteristics</h2>
						<p>${self_characteristics}</p>
					</div>
				` : ''}
				
				${sertificates || portfolio ? `
					<div class="links">
						<h2>Links</h2>
						${sertificates ? `<p><a href="${sertificates}" target="_blank">Certificates</a></p>` : ''}
						${portfolio ? `<p><a href="${portfolio}" target="_blank">Portfolio</a></p>` : ''}
					</div>
				` : ''}
			</div>
		</body>
	</html>
	`;
}