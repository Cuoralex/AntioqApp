
        // Mobile menu toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }

        // Featured carousel functionality
        let currentSlide = 0;
        const totalSlides = 3;

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function previousSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function updateCarousel() {
            const carousel = document.getElementById('featuredCarousel');
            const translateX = -currentSlide * (100 / totalSlides);
            carousel.style.transform = `translateX(${translateX}%)`;
        }

        // Auto-advance carousel
        setInterval(nextSlide, 5000);

        // Price range slider
        const priceSlider = document.querySelector('input[type="range"]');
        const priceValue = document.getElementById('priceValue');

        if (priceSlider && priceValue) {
            priceSlider.addEventListener('input', function(e) {
                const value = parseInt(e.target.value);
                priceValue.textContent = `$${value.toLocaleString('es-CO')}`;
            });
        }

        // Clear filters
        function clearFilters() {
            // Reset all checkboxes and radio buttons
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
            
            // Reset select elements
            document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
            
            // Reset price slider
            if (priceSlider) {
                priceSlider.value = 250000;
                priceValue.textContent = '$250.000';
            }
        }

        // View toggle
        function toggleView(viewType) {
            const grid = document.getElementById('routesGrid');
            const buttons = document.querySelectorAll('[onclick*="toggleView"]');
            
            buttons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('hover:bg-gray-50');
            });
            
            if (viewType === 'grid') {
                grid.className = 'grid md:grid-cols-2 xl:grid-cols-3 gap-6';
                buttons[0].classList.add('bg-primary', 'text-white');
                buttons[0].classList.remove('hover:bg-gray-50');
            } else {
                grid.className = 'space-y-4';
                buttons[1].classList.add('bg-primary', 'text-white');
                buttons[1].classList.remove('hover:bg-gray-50');
            }
        }

        // Route detail modal
        function openRouteDetail(routeId) {
            const modal = document.getElementById('routeDetailModal');
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeRouteDetail() {
            const modal = document.getElementById('routeDetailModal');
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('bg-black')) {
                closeRouteDetail();
            }
        });

        // Heart button toggle
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('fa-heart')) {
                e.target.classList.toggle('far');
                e.target.classList.toggle('fas');
                e.target.classList.toggle('text-accent');
            }
        });

        // Search functionality
        document.querySelector('button[class*="bg-accent"]').addEventListener('click', function() {
            const searchTerm = document.querySelector('input[placeholder*="experiencia"]').value;
            const routeType = document.querySelector('select').value;
            
            // Simulate search
            console.log('Searching for:', searchTerm, 'Type:', routeType);
            
            // Here you would typically filter the routes based on search criteria
            alert(`Buscando: "${searchTerm}" en categoría: "${routeType || 'Todas'}"`);
        });

        // Filter application
        document.querySelector('button[class*="Aplicar Filtros"]').addEventListener('click', function() {
            // Collect all filter values
            const filters = {
                routeTypes: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value),
                duration: document.querySelector('input[name="duration"]:checked')?.value,
                priceRange: priceSlider?.value,
                groupSize: document.querySelector('select').value
            };
            
            console.log('Applied filters:', filters);
            alert('Filtros aplicados correctamente');
        });
