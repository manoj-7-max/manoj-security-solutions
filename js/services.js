document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/services')
        .then(response => response.json())
        .then(services => {
            const container = document.querySelector('.services-list .container');
            container.innerHTML = '';

            if (services.length === 0) {
                container.innerHTML = '<div style="text-align: center; color: #aaa; padding: 50px;"><h3>No Services Listed Yet.</h3></div>';
                return;
            }

            services.forEach((service, index) => {
                const isReverse = index % 2 !== 0 ? 'reverse' : '';
                const flexWrap = isReverse ? 'wrap-reverse' : 'wrap';

                let imageHtml = '';
                if (service.image) {
                    imageHtml = `<img src="${service.image}" alt="${service.name}" style="border-radius: 10px; width: 100%; box-shadow: var(--shadow);">`;
                } else {
                    imageHtml = `<div style="height: 300px; background: #2c3e50; border-radius: 10px; display: flex; align-items: center; justify-content: center;"><i class="${service.icon}" style="font-size: 5rem; color: #66fcf1;"></i></div>`;
                }

                // Features list
                let featuresHtml = '';
                if (service.features && service.features.length > 0) {
                    featuresHtml = '<ul style="margin-top: 20px; padding-left: 20px;">';
                    service.features.forEach(f => {
                        featuresHtml += `<li style="margin-bottom: 10px;"><i class="fa-solid fa-check" style="color: var(--color-primary); margin-right: 10px;"></i> ${f}</li>`;
                    });
                    featuresHtml += '</ul>';
                }

                const row = `
                    <div class="service-row ${isReverse}" style="display: flex; gap: 40px; align-items: center; margin-bottom: 80px; flex-wrap: ${flexWrap};">
                        <div class="${isReverse ? 'service-image' : 'service-content'}" style="flex: 1; min-width: 300px;">
                             ${isReverse ? imageHtml : `
                                <div class="icon-box" style="margin: 0 0 20px 0;">
                                    <i class="${service.icon}"></i>
                                </div>
                                <h2>${service.name}</h2>
                                <p>${service.description}</p>
                                ${featuresHtml}
                             `}
                        </div>
                        <div class="${isReverse ? 'service-content' : 'service-image'}" style="flex: 1; min-width: 300px;">
                             ${isReverse ? `
                                <div class="icon-box" style="margin: 0 0 20px 0;">
                                    <i class="${service.icon}"></i>
                                </div>
                                <h2>${service.name}</h2>
                                <p>${service.description}</p>
                                ${featuresHtml}
                             ` : imageHtml}
                        </div>
                    </div>
                `;
                container.innerHTML += row;
            });
        })
        .catch(err => {
            console.error('Error loading services:', err);
            document.querySelector('.services-list .container').innerHTML = '<div style="text-align: center; color: #ff4d4d; padding: 50px;"><h3>Failed to Load Services</h3></div>';
        });
});
