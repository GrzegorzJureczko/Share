document.addEventListener("DOMContentLoaded", function () {


    // step1 -> step2
    if (window.location.pathname === '/add/') {
        const buttonStep1 = document.querySelector('#btn-step-1')
        const emptyCategories = document.getElementById('empty-categories')
        let chosenCategories

        buttonStep1.addEventListener("click", (e) => {
            chosenCategories = []
            const inputs = e.target.parentElement.parentElement.querySelectorAll('input')
            inputs.forEach(input => {
                if (input.checked) {
                    chosenCategories.push(input.value)
                }
            })
            if (chosenCategories.length < 1) {
                emptyCategories.style.display = 'flex'
                e.stopImmediatePropagation()
            } else {
                emptyCategories.style.display = 'none'
            }
        })

        // step2 -> step3
        const buttonStep2 = document.querySelector('#btn-step-2')
        const bagsCheckbox = document.querySelector('#step-2').querySelector('label')
        let noOfBags
        const emptyBags = document.getElementById('empty-bags')
        const organizationsCheckbox = document.querySelector('#step-3')
        const organizationsAll = organizationsCheckbox.querySelectorAll('label')

        const categoriesNoMatch = document.getElementById('catategories-no-match')

        buttonStep2.addEventListener('click', (e) => {
            noOfBags = bagsCheckbox.querySelector('input').value
            if (noOfBags < 1) {
                emptyBags.style.display = 'flex'
                e.stopImmediatePropagation()
            } else {
                emptyBags.style.display = 'none'
            }
            organizationsAll.forEach(organization => {
                let organizationCategories = []
                organizationCategories += organization.querySelector('.hidden-info').innerText
                if (chosenCategories.every(category => organizationCategories.includes(category))) {
                    organization.style.display = 'flex'
                } else {
                    organization.style.display = 'none'
                }
            })


            let orgranizationList = []
            organizationsAll.forEach(organization => {
                let organizationCategories = []

                organizationCategories += organization.querySelector('.hidden-info').innerText
                if (chosenCategories.every(category => organizationCategories.includes(category))) {
                    orgranizationList.push(organization)
                }
            })
            if (orgranizationList.length < 1) {
                categoriesNoMatch.style.display = 'flex'
            } else {
                categoriesNoMatch.style.display = 'none'
            }
        })

        // step3 -> step4
        const buttonStep3 = document.querySelector('#btn-step-3')
        const noOrganization = document.getElementById('no_organization_picked')
        let organizationChosen

        buttonStep3.addEventListener('click', (e) => {
            const radioChecked = document.querySelector('input[name = "org"]:checked')
            organizationChosen = document.querySelector('input[name = "org"]:checked').value
            if (radioChecked == null) {
                noOrganization.style.display = 'flex'
                e.stopImmediatePropagation()
            } else {
                noOrganization.style.display = 'none'
            }
            console.log(noOfBags)
            console.log(parseInt(noOfBags)===1)
        })

        // step4 -> step5
        const buttonStep4 = document.querySelector('#btn-step-4')

        buttonStep4.addEventListener('click', (e) => {
            const address = document.querySelector("[name = 'address']").value
            const city = document.querySelector("[name = 'city']").value
            const postcode = document.querySelector("[name = 'postcode']").value
            const phone = document.querySelector("[name = 'phone']").value
            const data = document.querySelector("[name = 'data']").value
            const time = document.querySelector("[name = 'time']").value
            const more_info = document.querySelector("[name = 'more_info']").value

            const formAddress = document.getElementById('address')
            const formDate = document.getElementById('date')
            const formBags = document.getElementById('sum_bags')
            const formOrg = document.getElementById('sum_org')

            const liAddress = document.createElement('li')
            liAddress.innerText = address
            formAddress.appendChild(liAddress)

            const liCity = document.createElement('li')
            liCity.innerText = city
            formAddress.appendChild(liCity)

            const liPostcode = document.createElement('li')
            liPostcode.innerText = postcode
            formAddress.appendChild(liPostcode)

            const liPhone = document.createElement('li')
            liPhone.innerText = phone
            formAddress.appendChild(liPhone)

            const liData = document.createElement('li')
            liData.innerText = data
            formDate.appendChild(liData)

            const liTime = document.createElement('li')
            liTime.innerText = time
            formDate.appendChild(liTime)

            const liMoreInfo = document.createElement('li')
            liMoreInfo.innerText = more_info
            formDate.appendChild(liMoreInfo)

            if (noOfBags == 1){
                formBags.innerText = `${noOfBags} worek`
            } else if (noOfBags == 2 || noOfBags == 3 || noOfBags == 4){
                formBags.innerText = `${noOfBags} worki`
            } else {
                formBags.innerText = `${noOfBags} worków`
            }

            console.log(organizationChosen)
            formOrg.innerText = `Dla fundacji ${organizationChosen} w mieście ${city}`


        })

    }


    /**
     * HomePage - Help section
     */
    class Help {
        constructor($el) {
            this.$el = $el;
            this.$buttonsContainer = $el.querySelector(".help--buttons");
            this.$slidesContainers = $el.querySelectorAll(".help--slides");
            this.currentSlide = this.$buttonsContainer.querySelector(".active").parentElement.dataset.id;
            this.init();
        }

        init() {
            this.events();
        }

        events() {
            /**
             * Slide buttons
             */
            this.$buttonsContainer.addEventListener("click", e => {
                if (e.target.classList.contains("btn")) {
                    this.changeSlide(e);
                }
            });

            /**
             * Pagination buttons
             */
            this.$el.addEventListener("click", e => {
                if (e.target.classList.contains("btn") && e.target.parentElement.parentElement.classList.contains("help--slides-pagination")) {
                    this.changePage(e);
                }
            });
        }

        changeSlide(e) {
            e.preventDefault();
            const $btn = e.target;

            // Buttons Active class change
            [...this.$buttonsContainer.children].forEach(btn => btn.firstElementChild.classList.remove("active"));
            $btn.classList.add("active");

            // Current slide
            this.currentSlide = $btn.parentElement.dataset.id;

            // Slides active class change
            this.$slidesContainers.forEach(el => {
                el.classList.remove("active");

                if (el.dataset.id === this.currentSlide) {
                    el.classList.add("active");
                }
            });
        }

        /**
         * TODO: callback to page change event
         */
        changePage(e) {
            e.preventDefault();
            const page = e.target.dataset.page;

            console.log(page);
        }
    }

    const helpSection = document.querySelector(".help");
    if (helpSection !== null) {
        new Help(helpSection);
    }

    /**
     * Form Select
     */
    class FormSelect {
        constructor($el) {
            this.$el = $el;
            this.options = [...$el.children];
            this.init();
        }

        init() {
            this.createElements();
            this.addEvents();
            this.$el.parentElement.removeChild(this.$el);
        }

        createElements() {
            // Input for value
            this.valueInput = document.createElement("input");
            this.valueInput.type = "text";
            this.valueInput.name = this.$el.name;

            // Dropdown container
            this.dropdown = document.createElement("div");
            this.dropdown.classList.add("dropdown");

            // List container
            this.ul = document.createElement("ul");

            // All list options
            this.options.forEach((el, i) => {
                const li = document.createElement("li");
                li.dataset.value = el.value;
                li.innerText = el.innerText;

                if (i === 0) {
                    // First clickable option
                    this.current = document.createElement("div");
                    this.current.innerText = el.innerText;
                    this.dropdown.appendChild(this.current);
                    this.valueInput.value = el.value;
                    li.classList.add("selected");
                }

                this.ul.appendChild(li);
            });

            this.dropdown.appendChild(this.ul);
            this.dropdown.appendChild(this.valueInput);
            this.$el.parentElement.appendChild(this.dropdown);
        }

        addEvents() {
            this.dropdown.addEventListener("click", e => {
                const target = e.target;
                this.dropdown.classList.toggle("selecting");

                // Save new value only when clicked on li
                if (target.tagName === "LI") {
                    this.valueInput.value = target.dataset.value;
                    this.current.innerText = target.innerText;
                }
            });
        }
    }

    document.querySelectorAll(".form-group--dropdown select").forEach(el => {
        new FormSelect(el);
    });

    /**
     * Hide elements when clicked on document
     */
    document.addEventListener("click", function (e) {
        const target = e.target;
        const tagName = target.tagName;

        if (target.classList.contains("dropdown")) return false;

        if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
            return false;
        }

        if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
            return false;
        }

        document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
            el.classList.remove("selecting");
        });
    });

    /**
     * Switching between form steps
     */
    class FormSteps {
        constructor(form) {
            this.$form = form;
            this.$next = form.querySelectorAll(".next-step");
            this.$prev = form.querySelectorAll(".prev-step");
            this.$step = form.querySelector(".form--steps-counter span");
            this.currentStep = 1;

            this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
            const $stepForms = form.querySelectorAll("form > div");
            this.slides = [...this.$stepInstructions, ...$stepForms];

            this.init();
        }

        /**
         * Init all methods
         */
        init() {
            this.events();
            this.updateForm();
        }

        /**
         * All events that are happening in form
         */
        events() {
            // Next step
            this.$next.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep++;
                    this.updateForm();
                });
            });

            // Previous step
            this.$prev.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep--;
                    this.updateForm();
                });
            });

            // Form submit
            this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
        }

        /**
         * Update form front-end
         * Show next or previous section etc.
         */
        updateForm() {
            this.$step.innerText = this.currentStep;

            // TODO: Validation

            this.slides.forEach(slide => {
                slide.classList.remove("active");

                if (slide.dataset.step == this.currentStep) {
                    slide.classList.add("active");
                }
            });

            this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 6;
            this.$step.parentElement.hidden = this.currentStep >= 6;

            // TODO: get data from inputs and show them in summary
        }

        /**
         * Submit form
         *
         * TODO: validation, send data to server
         */
        submit(e) {
            e.preventDefault();
            this.currentStep++;
            this.updateForm();
        }
    }

    const form = document.querySelector(".form--steps");
    if (form !== null) {
        new FormSteps(form);
    }


});
