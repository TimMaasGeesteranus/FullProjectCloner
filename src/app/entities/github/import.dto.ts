export class ImportDto {
  vcs: string;
  vcs_url: string;
  constructor(vcs_url: string) {
    this.vcs = 'git';
    this.vcs_url = vcs_url;
  }
}
