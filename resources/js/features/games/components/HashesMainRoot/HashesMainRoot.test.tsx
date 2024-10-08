import { render, screen } from '@/test';
import { createGame } from '@/test/factories';

import { HashesMainRoot } from './HashesMainRoot';

describe('Component: HashesMainRoot', () => {
  it('renders without crashing', () => {
    // ARRANGE
    const { container } = render<App.Platform.Data.GameHashesPageProps>(<HashesMainRoot />, {
      pageProps: {
        can: { manageGameHashes: false },
        game: createGame(),
        hashes: [],
      },
    });

    // ASSERT
    expect(container).toBeTruthy();
  });

  it('given the user can manage hashes, shows a manage link', () => {
    // ARRANGE
    render<App.Platform.Data.GameHashesPageProps>(<HashesMainRoot />, {
      pageProps: {
        can: { manageGameHashes: true },
        game: createGame(),
        hashes: [],
      },
    });

    // ASSERT
    expect(screen.getByRole('link', { name: /manage hashes/i })).toBeVisible();
  });

  it('given the game has no forum topic, does not render a forum topic link', () => {
    // ARRANGE
    render<App.Platform.Data.GameHashesPageProps>(<HashesMainRoot />, {
      pageProps: {
        can: { manageGameHashes: true },
        game: createGame({ forumTopicId: undefined }),
        hashes: [],
      },
    });

    // ASSERT
    expect(screen.queryByText(/official forum topic/i)).not.toBeInTheDocument();
  });
});
