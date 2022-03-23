using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekatKonacni.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Polaznici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JMBG = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Grupa = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Polaznici", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Sale",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Adresa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ImeLokacije = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sale", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Vestine",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vestine", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Treneri",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SifraTrenera = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    VestinaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Treneri", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Treneri_Vestine_VestinaID",
                        column: x => x.VestinaID,
                        principalTable: "Vestine",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Treninzi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Termin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TrajanjeUMinutima = table.Column<int>(type: "int", nullable: false),
                    Grupa = table.Column<int>(type: "int", nullable: false),
                    VestinaID = table.Column<int>(type: "int", nullable: true),
                    SalaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Treninzi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Treninzi_Sale_SalaID",
                        column: x => x.SalaID,
                        principalTable: "Sale",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Treninzi_Vestine_VestinaID",
                        column: x => x.VestinaID,
                        principalTable: "Vestine",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "VesPolSpojevi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pojas = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    VestinaID = table.Column<int>(type: "int", nullable: true),
                    PolaznikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VesPolSpojevi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_VesPolSpojevi_Polaznici_PolaznikID",
                        column: x => x.PolaznikID,
                        principalTable: "Polaznici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VesPolSpojevi_Vestine_VestinaID",
                        column: x => x.VestinaID,
                        principalTable: "Vestine",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Treneri_VestinaID",
                table: "Treneri",
                column: "VestinaID");

            migrationBuilder.CreateIndex(
                name: "IX_Treninzi_SalaID",
                table: "Treninzi",
                column: "SalaID");

            migrationBuilder.CreateIndex(
                name: "IX_Treninzi_VestinaID",
                table: "Treninzi",
                column: "VestinaID");

            migrationBuilder.CreateIndex(
                name: "IX_VesPolSpojevi_PolaznikID",
                table: "VesPolSpojevi",
                column: "PolaznikID");

            migrationBuilder.CreateIndex(
                name: "IX_VesPolSpojevi_VestinaID",
                table: "VesPolSpojevi",
                column: "VestinaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Treneri");

            migrationBuilder.DropTable(
                name: "Treninzi");

            migrationBuilder.DropTable(
                name: "VesPolSpojevi");

            migrationBuilder.DropTable(
                name: "Sale");

            migrationBuilder.DropTable(
                name: "Polaznici");

            migrationBuilder.DropTable(
                name: "Vestine");
        }
    }
}
