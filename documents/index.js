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
	const jobEndDateText = still_working ? '' : job_end_date ? new Date(job_end_date).toLocaleDateString() : '';
	const graduationDate = new Date(graduation_date || null);
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const graduationDateText = graduation_date ? `${months[graduationDate.getMonth()]}, ${graduationDate.getFullYear()}` : '';

	return `
    <!doctype html>
    <html>
			<head>
				<meta charset="utf-8">
				<title>PDF Result Template</title>
				<style>
					
				</style>
			</head>
			<body>

				<div id="doc2" class="yui-t7">
					<div id="inner">
					
						<div id="hd">
							<div class="yui-gc">
								<div class="yui-u first">
									<h1>${first_name} ${last_name}</h1>
									<h2>${role}</h2>
									<h4>${country}, ${city}, ${postal_code}</h4>
								</div>

								<div class="yui-u">
									<div class="contact-info">
										<h3><a href="mailto:${email}">${email}</a></h3>
										<h3>${phone}</h3>
									</div>
								</div>
							</div>
						</div>

						<div id="bd">
							<div id="yui-main">
								<div class="yui-b">

									<div class="yui-gf">
										<div class="yui-u first">
											<h2>Про себе</h2>
										</div>
										<div class="yui-u">
											<p class="enlarge">
												${self_characteristics} 
											</p>
										</div>
									</div>

									<div class="yui-gf">
										<div class="yui-u first">
											<h2>Навички</h2>
										</div>
										<div class="yui-u">
											<ul class="talent">
												${skillsText}
											</ul>
										</div>
									</div>

									<div class="yui-gf">
					
										<div class="yui-u first">
											<h2>Досвід роботи</h2>
										</div>

										<div class="yui-u">

											<!--
											<div class="job">
												<h2>Microsoft</h2>
												<h3>Principal and Creative Lead</h3>
												<h4>2004-2005</h4>
												<p>Intrinsicly transform flexible manufactured products without excellent intellectual capital. Energistically evisculate orthogonal architectures through covalent action items. Assertively incentivize sticky platforms without synergistic materials. </p>
											</div>
											-->

											<div class="job last">
												<h2>${employer}</h2>
												<h3>${job_title}</h3>
												<h4>${jobStartDateText} - ${jobEndDateText}</h4>
												<p>${job_description}</p>
											</div>

										</div>
									</div>


									<div class="yui-gf last">
										<div class="yui-u first">
											<h2>Освіта</h2>
										</div>
										<div class="yui-u">
											<h2>${school_name}, ${school_location}</h2>
											<h3>${degree}</h3>
											<h4>${graduationDateText}</h4>
											<h3>${field_of_study} &mdash; <strong>${school_mark} GPA</strong> </h3>
										</div>
									</div>

									<div class="yui-gf">
									<div class="yui-u first">
										<h2>Додатково</h2>
									</div>
									<div class="yui-u">
											<div class="talent">
												<h2>Знання мов</h2>
												<ul>
													${languagesText}
												</ul>
											</div>

											<div class="talent">
												<h2>
													<a href=${sertificates}>Сертифікати</a>
												</h2>
											</div>

											<div class="talent">
												<h2>
													<a href=${portfolio}>Портфоліо</a>
												</h2>
											</div>

											${additionalFieldsText}
									</div>
								</div>


								</div>
							</div>
						</div>

						<div id="ft">
							<p>${first_name} ${last_name} &mdash; <a href="mailto:${email}">${email}</a> &mdash; ${phone}</p>
						</div>
					</div>
				</div>
			</body>
		</html>
	`;
}