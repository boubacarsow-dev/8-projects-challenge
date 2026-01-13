// recuperation DOM
 const addTaskk = document.getElementById("btn-add");
 const taskInput = document.getElementById('task-input');
 const saveTache = document.getElementById('btn-save');
 const cancelTask = document.getElementById('btn-cancel');
 const listTask = document.getElementById('todo-list');
  const progressTask = document.getElementById('in-progress');
   const doneTask = document.getElementById('done');
   const colonnes = document.querySelectorAll('.col');
  
    // data base locale par un tableau 
    let tasks = [];

             // sauvegarder les taches
            function saveTask() {
                const donnes = JSON.stringify(tasks);
                localStorage.setItem("mesTaches", donnes);
                console.log("sauvegarde effectuees");
            }

            // recuperer les donnnes
           function loadTask() {
            const donnes = localStorage.getItem("mesTaches");
            if(donnes){
                tasks = JSON.parse(donnes)
            }
            else{
                tasks = []
            }
           } 

    //ajouter une tache
    function addTask(text) {
        let tache = {
            id: Math.ceil(Math.random()*388),
            text:text,
            statut:"faire"
        };
         try {
            if (tache.text === '') {
                throw new Error("la tache ne peut pas etre vide");
                
            }
            tasks.push(tache);
            saveTask();
            afficherTache();
         } catch (error) {
            throw new Error("tache n'a pas ete ajoutee");
            
         }
    };

    // supprimer une tache
    function deleteTask(id) {
        const longInitial = tasks.length;
        del_tache = tasks.filter(ide => ide.id !== id);
        if (longInitial === tasks.length) {
            return `aucune tache correspondante`
        }
        saveTask()
        afficherTache()
    };

    // creer un drag and drop
    function drag_et_drop() {
        
        // boucle pour mes colonnes
         colonnes.forEach(colonne=>{
            colonne.addEventListener('dragover', (event)=>{
                event.prevenDefault();
                colonne.classList.add('drag-over');
            })
            // si on quitte
            colonne.addEventListener('drag-leave', (event)=>{
                event.preventDefault();
                colonne.classList.remove('drag-over')
            })
            // si on depose
            colonne.addEventListener('drop', (event)=>{
                event.preventDefault();
                colonne.classList.remove('drag-over');
                
                // recuperons l'id de la new colonne
                const colonneId = colonne.id 
                let nouvStatut ;
                if(colonneId === 'todo-list')
                    nouvStatut = 'todo';
                else if(colonneId === 'in-progress')
                    nouvStatut = 'in-progress';
                else if(colonneId === 'done') nouvStatut = 'done';
                deplacerTask() ///
            });
         });
    };

    // ma fonction pour deplacer une tache
    function deplacerTask(taskId, nouvStatut) {
        // trouver l'index
        const index = tasks.findIndex(t => t == taskId);
        if (index !== 1) {
            tasks[index].statut = nouvStatut;
        }
        saveTask()
        afficherTache();
    };

    // la fonction afficher
    function afficherTache() {
        listTask.innerHTML = '';
        progressTask.innerHTML = '';
        doneTask.innerHTML = '';
        tasks.forEach(tache =>{
            const carteTache = document.createElement('div')
            carteTache.className = 'carte-tache';
            carteTache.setAttribute('draggable', 'true')
            carteTache.dataset.id = tache.id;
            tache.innerHTML = `
              <div class="carte-title">
                    <div class="card-content">
                        <h4>
                            ${tache.text}
                        </h4>
                    </div>
                </div>
                 <div class="carte-btn">
                    <button type="button" class="btn-update">modifier</button>
                    <button type="button" class="btn-del">supprimer</button>
                 </div>
            `;
            // gerer les buttons
            cancelTask.addEventListener('click', ()=>{
                deleteTask(tache.id);

            });

            // ajouter dans la colonne
            if(tache.statut === 'todo') listTask.appendChild(carteTache);
            else if(tache.statut === 'in-progress') progressTask.appendChild(carteTache);
            else if(tache.statut === 'done') doneTask.appendChild(carteTache);
        })
    };
    taskInput.addEventListener('click', addTask())