const { setupSuggestions } = require("../utils/enmapUtils");

async function addSetupCommand(slashCommand) {
    slashCommand.addSubcommand((subcommand) =>
    subcommand
        .setName("suggestions")
        .setDescription(
            "Définir/Supprimer ce channel autorisable pour les propositions."
        )
    )
}

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    switch (interaction.options._subcommand) {
        case "suggestions":
            if (setupSuggestions.get(interaction.channel.id) === undefined) {
                setupSuggestions.set(
                    interaction.channel.id,
                    interaction.guild.id
                );
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> ajouté à la liste des channels propositions !`,
                    ephemeral: true,
                });
            } else {
                setupSuggestions.delete(interaction.channel.id);
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> supprimé de la liste des channels propositions !`,
                    ephemeral: true,
                });
            }
            break;
    }
}

module.exports = {
    addSetupCommand,
    execute,
};
